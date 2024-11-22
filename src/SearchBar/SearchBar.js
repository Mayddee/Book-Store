import React, { useContext, useState, useMemo } from "react";
import { myContext } from "../App";
import "./styles.css"
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const [value, setValue] = useState("");
    const { books } = useContext(myContext);
    const navigate = useNavigate()

    // Memoize the filteredBooks array
    const filteredBooks = useMemo(() => {
        if (!Array.isArray(books)) return []; // Ensure `books` is an array

        return books.filter((item) =>
            Object.keys(item).some((key) => {
                // Check if the key contains searchable string data
                if (typeof item[key] === "string") {
                    return item[key].toLowerCase().includes(value.toLowerCase());
                }
                return false; // Skip non-string fields
            })
        );
    }, [value, books]);

    const handleOnChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div style={{position: "relative",
            width: "300px", maxWidth: "600px", margin: "auto"
        }}>
            <label style={{display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row"
            }}>
                <input
                    type="text"
                    name="search"
                    placeholder="Search"
                    value={value}
                    onChange={handleOnChange}
                />
                {/* <button className="search-button">Search</button> */}
            </label>

            {value.trim() !== "" && (
                <div className="dropdown">
                    {filteredBooks.map((book) => (
                        <div key={book.id} className="drop" onClick={() => {
                            // stopPropagation()
                            navigate(`/catalog/${book.id}`)
                        }}>
                            <img
                                src={book.image_url}
                                alt={book.title}
                                className="book-image"
                            />
                            <div className="book-details">
                                <h3>{book.title}</h3>
                                <p>
                                    <strong>Rating:</strong> {book.rating}
                                </p>
                                <p>
                                    <strong>Genres:</strong> {book.genres}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
