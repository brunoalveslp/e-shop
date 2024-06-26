
using System.Linq.Expressions;

namespace Domain.Specifications;

public class BaseSpecification<T> : ISpecification<T>
{

    public Expression<Func<T, bool>> Criteria  { get; }

    public List<Expression<Func<T, object>>> Includes { get; } = new();

    public Expression<Func<T, object>> OrderBy { get; private set; }

    public Expression<Func<T, object>> OrderByDescending { get; private set; }

    public int Take { get; private set; }

    public int Skip { get; private set; }

    public bool IsPagingEnabled { get; private set; }

    public List<Expression<Func<T, object>>> ThenIncludes { get; } = new();
    public BaseSpecification()
    {
    }
    public BaseSpecification(Expression<Func<T, bool>> criteria)  
    {
        Criteria = criteria;
    }

    protected void AddInclude(Expression<Func<T, object>> includeExpression)
    {
        Includes.Add(includeExpression);
    }

    protected void AddThenInclude(Expression<Func<T, object>> thenIncludeExpression)
    {
        ThenIncludes.Add(thenIncludeExpression);
    }

    protected void AddOrderBy(Expression<Func<T, object>> orderByExpression)
    {
        OrderBy = orderByExpression;
    }

    protected void AddOrderByDescending(Expression<Func<T, object>> orderByDescendingExpression)
    {
        OrderByDescending = orderByDescendingExpression;
    }

    protected void ApplyPaging(int skip, int take)
    {
        Skip = skip;
        Take = take;
        IsPagingEnabled = true;
    }
}