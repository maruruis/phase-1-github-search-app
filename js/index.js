const searchGitUsers = () => {
    const form = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = searchInput.value.trim();

        if (username === '') {
            alert('Please enter a GitHub username');
            return;
        }

        try {
            // Fetching user data from GitHub API
            const userResponse = await fetch(`https://api.github.com/users/${username}`);

            const userData = await userResponse.json();

            // Fetching user's repositories from GitHub API
            const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
            if (!reposResponse.ok) {
                alert('Repositories not found');
                return;
            }
            const reposData = await reposResponse.json();

            // Clearing previous results
            userList.innerHTML = '';

            // Creating and appending user information elements
            const userListItem = document.createElement('li');
            userListItem.innerHTML = `
                <img src="${userData.avatar_url}" alt="${userData.login}" />
                <h3>${userData.login}</h3>
                <a href="${userData.html_url}" target="_blank">View Profile</a>
            `;
            userList.appendChild(userListItem);

            // Creating and appending user repository elements
            const reposList = document.getElementById('repos-list');
            reposList.innerHTML = '';

            reposData.forEach((repo) => {
                const repoListItem = document.createElement('li');
                repoListItem.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No description'}</p>
                    <a href="${repo.html_url}" target="_blank">View Repository</a>
                `;
                reposList.appendChild(repoListItem);
            });
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. try again later.');
        }
    });
};

document.addEventListener('DOMContentLoaded', searchGitUsers);