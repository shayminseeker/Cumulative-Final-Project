using Microsoft.EntityFrameworkCore;

public class LoginDb : DbContext
{
    public LoginDb(DbContextOptions<LoginDb> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
}
