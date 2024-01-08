
using Domain.Entities;
using Domain.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class SpecificationEvaluator<TEntity> where TEntity : BaseEntity
{
    public static IQueryable<TEntity> GetQuery(IQueryable<TEntity> inputQuery, ISpecification<TEntity> spec)
    {
        var query = inputQuery;

        if(spec.Criteria is not null)
        {
            query = query.Where(spec.Criteria);
        }

        if(spec.OrderBy is not null)
        {
            query = query.OrderBy(spec.OrderBy);
        }

        if(spec.OrderByDescending is not null)
        {
            query = query.OrderByDescending(spec.OrderByDescending);
        }

        if (spec.IsPagingEnabled)
        { 
            query = query.Skip(spec.Skip).Take(spec.Take);
        }

        query = spec.Includes.Aggregate(query, (current, include) => current.Include(include)); 

        return query;
    }
}