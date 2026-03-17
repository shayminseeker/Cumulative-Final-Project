using Microsoft.EntityFrameworkCore;
public class UserInfoDb : DbContext
{
    public UserInfoDb(DbContextOptions<UserInfoDb> options)
        : base(options)  {}

    public DbSet<UserInfo> Users { get; set; } = null!;
}