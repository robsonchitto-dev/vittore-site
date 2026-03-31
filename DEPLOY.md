# Vittore Site Deploy

## Production Paths

- Server: `34.52.222.93`
- User: `robson_chitto`
- Site repo: `/home/robson_chitto/vittore-site`
- Public web root: `/var/www/vittorepdr`

## Git Remote

The production repository should use the SSH remote below:

```bash
git@github.com:robsonchitto-dev/vittore-site.git
```

The server already has an SSH key configured for GitHub in `~/.ssh/config`.

## Exact Deploy Procedure

Run the deploy from inside the site repository:

```bash
cd /home/robson_chitto/vittore-site
git pull origin main
rsync -av --delete --exclude ".git" --exclude "presentations" ./ /var/www/vittorepdr/
```

## Notes

- This deploy updates only the Vittore site.
- Do not run deploy commands inside `/home/robson_chitto/mgold-prod`.
- The public site is served by Nginx from `/var/www/vittorepdr`.
- The `presentations` directory is intentionally excluded from the published site.
- The `--delete` flag removes files from `/var/www/vittorepdr` that no longer exist in the repository, so asset deletions should be reviewed carefully.

