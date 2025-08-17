# Scenario 1: Project is already on your computer

##Step 1: Check the current remote
git remote -v

## Step 2: Create your own new repository on GitHub
- Go to https://github.com
- Click "New Repository"
- Choose a name
- Set visibility to Public
- Do NOT initialize with README, .gitignore, or license

## Step 3: Replace mentor repo with your own repo
git remote set-url origin https://github.com/your-username/your-repo.git

## Step 4: Push your code to your new repo
git branch -M main
git push -u origin main

# Scenario 2: Project is NOT on your computer

## Step 1: Clone mentor’s repo
git clone https://github.com/mentor-org/private-repo.git
cd private-repo

## Step 2: Remove mentor’s remote
git remote remove origin

## Step 3: Create your own new repository on GitHub
- Go to https://github.com
- Click "New Repository"
- Choose a name
- Set visibility to Public
- Do NOT initialize with README, .gitignore, or license

## Step 4: Add your own repo as origin
git remote add origin https://github.com/your-username/your-repo.git

## Step 5: Push code to your repo
git branch -M main
git push -u origin main
