class LocalStorageDB {
    constructor() {
        this.initializeDB();
    }

    // Initialize the database if it doesn't exist yet
    initializeDB() {
        const usersInDB = localStorage.getItem('users');

        if (!usersInDB) {
            const users = [
                { userID: 0, name: 'Mana', rentedMovies: [], budget: Math.floor(Math.random() * 500) + 100 },
                { userID: 1, name: 'Jasmyne', rentedMovies: [], budget: Math.floor(Math.random() * 500) + 100 },
                { userID: 2, name: 'Aura', rentedMovies: [], budget: Math.floor(Math.random() * 500) + 100 },
                { userID: 3, name: 'Tina', rentedMovies: [], budget: Math.floor(Math.random() * 500) + 100 }
            ];
            localStorage.setItem('users', JSON.stringify(users));
        }
    }

    // Helper method to get all users
    getUsers() {
        return JSON.parse(localStorage.getItem('users'));
    }

    // Helper method to set users
    setUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    rentMovie(userID, movieId) {
        const users = this.getUsers();
        const user = users.find(user => user.userID === Number(userID));
        if (user && user.rentedMovies && user.budget >= 10) {  // Check if the user has enough budget
            user.rentedMovies.push({ id: movieId });
            user.budget -= 10;  // Deduct 10 units from the user's budget
            this.setUsers(users);
        } else {
            console.error("User not found, user's rentedMovies is undefined, or not enough budget!");
        }
    }

    deleteMovie(userID, movieId) {
        const users = this.getUsers();
        const user = users.find(user => user.userID === Number(userID));
        if (user && user.rentedMovies) {
            user.rentedMovies = user.rentedMovies.filter(movie => movie.id !== movieId);
            user.budget += 10;  // Add back 10 units to the user's budget
            this.setUsers(users);
        } else {
            console.error("User not found or user's rentedMovies is undefined!");
        }
    }

    getUserRentedMovies(userID) {
        const users = this.getUsers();
        const user = users.find(user => user.userID === Number(userID));
        return user && user.rentedMovies ? user.rentedMovies : [];
    }

    getUserBudget(userID) {
        const user = this.getUsers().find(user => user.userID === Number(userID));
        return user ? user.budget : 0;
    }

}

const db = new LocalStorageDB();
export default db;

