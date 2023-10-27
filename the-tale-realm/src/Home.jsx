import React from "react";

const books = [
    {
        id: 1,
        title: "Book Title 1",
        author: "Author 1",
        category: "Fiction",
        imageUrl: "https://images.ctfassets.net/usf1vwtuqyxm/6VuPUG4wPtmg3xvqwm6ZSn/2465365bae53ac09562f7bcea0b75cb3/English_Harry_Potter_2_Epub_9781781100226.jpg?w=914&q=70&fm=webp",
    },
    {
        id: 2,
        title: "Book Title 2",
        author: "Author 2",
        category: "Non-fiction",
        imageUrl: "https://images.ctfassets.net/usf1vwtuqyxm/6VuPUG4wPtmg3xvqwm6ZSn/2465365bae53ac09562f7bcea0b75cb3/English_Harry_Potter_2_Epub_9781781100226.jpg?w=914&q=70&fm=webp",
    },
];

function HomePage() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        Bookstore
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/categories">
                                    Categories
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/about">
                                    About Us
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/contact">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <header className="jumbotron bg-light text-center">
                <div className="container">
                    <h1>Welcome to Our Professional Bookstore</h1>
                    <p>Discover a world of knowledge and imagination.</p>
                </div>
            </header>

            <main className="container my-4">
                <section className="mb-5">
                    <h2 className="text-center">Featured Books</h2>
                    <div className="row">
                        {books.map((book) => (
                            <div key={book.id} className="col-12 col-md-6 col-lg-4 mb-4">
                                <div className="card">
                                    <img
                                        src={book.imageUrl}
                                        alt={book.title}
                                        className="card-img-top"
                                        height="300"
                                    />
                                    <div className="card-body">
                                        <h3 className="card-title">{book.title}</h3>
                                        <p className="card-text">
                                            <strong>Author:</strong> {book.author}
                                            <br />
                                            <strong>Category:</strong> {book.category}
                                        </p>
                                        <a href={`/book/${book.id}`} className="btn btn-primary">
                                            Read
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-secondary text-white py-5">
                    <div className="container">
                        <h2 className="text-center text-white mb-4">About Us</h2>
                        <p>
                            We are passionate about books and literature. Our mission is to
                            provide you with a vast collection of books from various genres
                            and authors. Explore, learn, and enjoy the world of reading with
                            us.
                        </p>
                    </div>
                </section>

                <section className="mt-5">
                    <div className="container">
                        <h2 className="text-center mb-4">Explore Categories</h2>
                        <div className="row">
                            <div className="col-6 col-md-4 col-lg-3 mb-4">
                                <div className="card">
                                    <img
                                        src="https://images.ctfassets.net/usf1vwtuqyxm/6VuPUG4wPtmg3xvqwm6ZSn/2465365bae53ac09562f7bcea0b75cb3/English_Harry_Potter_2_Epub_9781781100226.jpg?w=914&q=70&fm=webp"
                                        alt="Category 1"
                                        className="card-img-top"
                                    />
                                    <div className="card-body">
                                        <h4 className="card-title">Category 1</h4>
                                        <p className="card-text">
                                            Discover books in Category 1.
                                        </p>
                                        <a href="/category/1" className="btn btn-primary">
                                            Explore
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-md-4 col-lg-3 mb-4">
                                <div className="card">
                                    <img
                                        src="https://images.ctfassets.net/usf1vwtuqyxm/6VuPUG4wPtmg3xvqwm6ZSn/2465365bae53ac09562f7bcea0b75cb3/English_Harry_Potter_2_Epub_9781781100226.jpg?w=914&q=70&fm=webp"
                                        alt="Category 2"
                                        className="card-img-top"
                                    />
                                    <div className="card-body">
                                        <h4 className="card-title">Category 2</h4>
                                        <p className="card-text">
                                            Dive into books in Category 2.
                                        </p>
                                        <a href="/category/2" className="btn btn-primary">
                                            Explore
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-md-4 col-lg-3 mb-4">
                                <div className="card">
                                    <img
                                        src="https://images.ctfassets.net/usf1vwtuqyxm/6VuPUG4wPtmg3xvqwm6ZSn/2465365bae53ac09562f7bcea0b75cb3/English_Harry_Potter_2_Epub_9781781100226.jpg?w=914&q=70&fm=webp"
                                        alt="Category 3"
                                        className="card-img-top"
                                    />
                                    <div className="card-body">
                                        <h4 className="card-title">Category 3</h4>
                                        <p className="card-text">
                                            Find your next read in Category 3.
                                        </p>
                                        <a href="/category/3" className="btn btn-primary">
                                            Explore
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-md-4 col-lg-3 mb-4">
                                <div className="card">
                                    <img
                                        src="https://images.ctfassets.net/usf1vwtuqyxm/6VuPUG4wPtmg3xvqwm6ZSn/2465365bae53ac09562f7bcea0b75cb3/English_Harry_Potter_2_Epub_9781781100226.jpg?w=914&q=70&fm=webp"
                                        alt="Category 4"
                                        className="card-img-top"
                                    />
                                    <div className="card-body">
                                        <h4 className="card-title">Category 4</h4>
                                        <p className="card-text">
                                            Uncover hidden gems in Category 4.
                                        </p>
                                        <a href="/category/4" className="btn btn-primary">
                                            Explore
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-dark text-white text-center py-3">
                <div className="container">
                    <p>&copy; 2023 Professional Bookstore</p>
                </div>
            </footer>
        </div>
    );
}

export default HomePage;
