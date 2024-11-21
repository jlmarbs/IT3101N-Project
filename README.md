# e-Pitaka

Digital Payment System for Educational Institutions

# Contribution

To contribute, `Fork` this repository in your Github which can be seen on the top right.
![image](https://github.com/NotRelix/e-pitaka/assets/111989096/089875d8-74bc-4919-809c-b4ff11e82c79)


Go to your Forked Repository, click on `Code`, and copy the URL as shown.

![image](https://github.com/NotRelix/e-pitaka/assets/111989096/09e93194-be12-423d-845b-64540ac63a0e)

In your terminal, navigate to the Directory you want it to be saved, and with the saved URL do the following:
```bash
git clone <the_url_you_copied>

git clone https://github.com/NotRelix/e-pitaka.git    # Example
cd e-pitaka                                           # Make that file the current directory
```

You can then make changes within that file whenever you want, but make sure to `git pull` everytime you start coding to fetch the most recent changes.
Once you are done adding new features, you want the changes to appear in your Forked Repository.
```bash
git add .                              # Prepares all files to be pushed
git commit -m "Your commit message"    # A commit message example would be "fix: handle zero division"
git push origin main                   # Makes the changes to your Forked Repository
```

Once that is finished, go to your Forked Repository and click on `Compare and Pull Request` to make a pull request on the actual Repository.
Wait for the owner of the Repository to approve or suggest you to make more changes.

# Usage

Once you have the repository / folder of the current project, make sure to run both the client and the server.

You can do this by going to that directory `cd <directory_name>` and by doing `npm run dev`.

### Here's for the Client:

![image](https://github.com/NotRelix/e-pitaka/assets/111989096/f10c2c69-2c38-4f67-935c-51f22d46774a)

### Here's for the Server:

![image](https://github.com/NotRelix/e-pitaka/assets/111989096/b76bda5c-5cbf-42bc-9723-9acd53c42723)

Also, don't forget to import the `epitaka-db.sql` in XAMPP. For reference, the database should look like this.

![image](https://github.com/NotRelix/e-pitaka/assets/111989096/3857e8a5-e878-4c64-adb2-0d1baa688779)
