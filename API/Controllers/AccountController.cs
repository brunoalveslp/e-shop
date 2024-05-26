
using API.Errors;
using API.Extentions;
using AutoMapper;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.DTOs;
using Domain.Interfaces;


namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManger;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AccountController(UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            ITokenService tokenService,
            IMapper mapper,
            RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManger = signInManager;
            _tokenService = tokenService;
            _mapper = mapper;
            _roleManager = roleManager;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,User")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {

            var user = await _userManager.FindByEmailFromClaimsPrincipal(User);
            return new UserDto
            {
                Email = user.Email,
                DisplayName = user.DisplayName,
                Roles = user.Roles,
                Token = _tokenService.CreateToken(user)
            };
        }

        [Authorize(Roles = "Admin,User")]
        [HttpGet("all")]
        public async Task<ActionResult> GetAllUsers()
        {
            var users = await _userManager.ListUsersWithAdress();

            return Ok(users);
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerUser)
        {
            if (CheckIfEmailExistsAsync(registerUser.Email).Result.Value)
            {
                return new BadRequestObjectResult(
                    new ApiValidationErrorResponse
                    { Errors = new[] { "O E-mail já está em uso." } });
            }

            var user = new AppUser
            {
                DisplayName = registerUser.DisplayName,
                Email = registerUser.Email,
                UserName = registerUser.Email,
                Roles = registerUser.Roles,
                Address = new Address
                {
                    FirstName = registerUser.Address.FirstName,
                    LastName = registerUser.Address.LastName,
                    Street = registerUser.Address.Street,
                    City = registerUser.Address.City,
                    State = registerUser.Address.State,
                    PostalCode = registerUser.Address.PostalCode
                }
            };

            var result = await _userManager.CreateAsync(user, registerUser.Password);

            foreach (var role in registerUser.Roles)
            {
                await _userManager.AddToRoleAsync(user, role);
            }
        
            if (!result.Succeeded)
            {
                return BadRequest(new ApiResponse(400));
            }

            return new UserDto
            {
                DisplayName = user.DisplayName,
                Token = _tokenService.CreateToken(user),
                Email = user.Email
            };

        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto login)
        {
            var user = await _userManager.FindByEmailAsync(login.Email);

            if (user is null) { return Unauthorized(new ApiResponse(400)); }

            var result = await _signInManger.PasswordSignInAsync(
                    userName: login.Email,
                    password: login.Password,
                    isPersistent: false,
                    lockoutOnFailure: false
                );



            if (!result.Succeeded)
            {
                return BadRequest("Ocorreu um erro ao logar!");
            }

            return new UserDto
            {
                DisplayName = user.DisplayName,
                Email = user.Email,
                Roles = user.Roles,
                Token = _tokenService.CreateToken(user)
            };

        }


        [HttpGet("address")]
        [Authorize]
        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {

            var user = await _userManager.FindUserByClaimsPrincipalWithAddress(User);

            if (user is null) { return Unauthorized(new ApiResponse(400)); }

            return _mapper.Map<Address, AddressDto>(user.Address);
        }

        [Authorize(Roles = "Admin,User")]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto address)
        {
            var user = await _userManager.FindUserByClaimsPrincipalWithAddress(User);

            if (user is null) { return Unauthorized(new ApiResponse(400)); }

            user.Address = _mapper.Map<AddressDto, Address>(address);

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return Ok(_mapper.Map<Address, AddressDto>(user.Address));
            }

            return BadRequest("Ocorreu algum problema ao atualizar o usuário.");
        }


        [Authorize(Roles = "Admin")]
        [HttpGet("user-roles")]
        public async Task<ActionResult> GetUserRoles()
        {
            var user = await _userManager.FindByEmailFromClaimsPrincipal(User);

            if(user is null) { return NotFound(new ApiResponse(404)); }

            var roles = await _userManager.GetRolesAsync(user);

            if(roles is null) { return BadRequest(new ApiResponse(400)); }

            return Ok(roles);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("user-roles/{id}")]
        public async Task<ActionResult> GetUserRolesById(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if(user is null) { return NotFound(new ApiResponse(404)); }

            var roles = await _userManager.GetRolesAsync(user);

            if(roles is null) { return BadRequest(new ApiResponse(400)); }

            return Ok(roles);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("update-user-roles")]
        public async Task<IActionResult> UpdateUserRole(UserRolesDto userRole)
        {
            var user = await _userManager.FindByEmailAsync(userRole.Email);

            if (user is null) { return Unauthorized(new ApiResponse(400)); }

            var actualRoles = await _userManager.GetRolesAsync(user);

            if (actualRoles is null) { return Unauthorized(new ApiResponse(400)); }

            await _userManager.RemoveFromRolesAsync(user, actualRoles);

            var result = await _userManager.AddToRoleAsync(user, userRole.Roles);

            if (!result.Succeeded)
            {
                return BadRequest("Ocorreu algum problema ao atualizar as atribuições do usuario.");
            }

            return Ok("Atribuição atualizada com sucesso!");
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("Roles")]
        public async Task<IActionResult> GetAllRolesAsync()
        {
            var rolesList = await _roleManager.Roles.ToListAsync();
  
            return Ok(rolesList);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("Roles/{id}")]
        public async Task<IActionResult> GetAllRolesByIdAsync(string id)
        {
            var role = await _roleManager.Roles.FirstOrDefaultAsync(x => x.Id == id);
  
            return Ok(role);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("add-role")]
        public async Task<IActionResult> AddRole(string role)
        {
            if (!await _roleManager.RoleExistsAsync(role))
            {
                return BadRequest(new ApiResponse(400));
            }
            await _roleManager.CreateAsync(new IdentityRole(role));

            return Ok("Role Created!");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("update-role")]
        public async Task<IActionResult> UpdateRole(string id, string updatedRole)
        {
            var roleToBeChanged = await _roleManager.FindByIdAsync(id);

            if (roleToBeChanged is null) { return NotFound(new ApiResponse(400)); }

            if(updatedRole != roleToBeChanged.Name)
            {
                roleToBeChanged.Name = updatedRole;
            }

            var result = await _roleManager.UpdateAsync(roleToBeChanged);

            if(!result.Succeeded) { return BadRequest(new ApiResponse(400)); }
           
            return Ok("Role Updated!");

        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("delete-role")]
        public async Task<IActionResult> DeleteRole(string roleName)
        {
            var role = await _roleManager.FindByNameAsync(roleName);
            if (role is null)
            {
                return BadRequest(new ApiResponse(400));
            }
            await _roleManager.DeleteAsync(role);

            return Ok("Role Deleted!");
        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<Boolean>> CheckIfEmailExistsAsync([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }

    }
}
