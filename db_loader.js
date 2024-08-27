const sequelize = require('./db');
const { hash, genSalt, compareSync } = require("bcrypt");
const User = require('./models/User');
const Movie = require('./models/Movie');

sequelize.sync({ force: true })
    .then(async () => {
        console.log('Database & tables created!');
        const salt = await genSalt(10);
        const hashedPassword = await hash('securepassword', salt);

        // Create a new user
        const newUser = await User.create({
            name: 'John Doe',
            username: 'johndoe',
            email: 'john.doe@example.com',
            password: hashedPassword,
            role: 'admin',
            address: '123 Main St',
            phoneNumber: '123-456-7890',
        });
        
        console.log('New User:', newUser.toJSON());

        // Create a new movie
        /*const newMovie = await Movie.create({
            title: 'Inception',
            synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology...',
            trailerUrl: 'https://example.com/trailer',
            imgUrl: 'https://example.com/image.jpg',
            rating: 8.8,
            status: 'released',
        });*/

        const movies = [
            {
                title: 'Inception',
                synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology...',
                trailerUrl: 'https://example.com/trailer',
                imgUrl: 'https://example.com/image.jpg',
                rating: 8.8,
                status: 'released',
            },
            {
                title: 'The Matrix',
                synopsis: 'A computer hacker learns from mysterious rebels about the true nature of his reality...',
                trailerUrl: 'https://example.com/matrix-trailer',
                imgUrl: 'https://example.com/matrix-image.jpg',
                rating: 8.7,
                status: 'released',
            },
            {
                title: 'Interstellar',
                synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival...',
                trailerUrl: 'https://example.com/interstellar-trailer',
                imgUrl: 'https://example.com/interstellar-image.jpg',
                rating: 8.6,
                status: 'released',
            }
        ];

        for (const movie of movies) {
            await Movie.create(movie);
        }
    
        console.log('Movies added successfully');

        //console.log('New Movie:', newMovie.toJSON());
    })
    .catch(err => console.error('Unable to sync database:', err));
