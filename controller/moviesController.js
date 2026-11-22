const e = require("express")
const { movies } = require("../data/data")

const getAllMovies = (req, res) =>{
    try {
        res.status(200).json({
            ok: true,
            message: "data fetched successfully !!!",
            data: movies
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error while fetching movies",
            error: error.message
        })
    }
}

const getSingleMovie = (req, res) =>{
    const id = req.params.id;
    try {
        const movie = movies.find(m => m.id === id);
        if(!movie){
            return res.status(404).json({
                ok: false,
                message:` movie with id ${id} was not found`
            })
        }
        res.status(200).json({
            ok: true,
            message: `movie with id ${id} fetched successfully!!!`,
            data: movie
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: `failed to fetch movie with id ${id} due to a server error`,
            error: error.message
        })
    }
}

const createMovie = (req, res) =>{
    try {
        const {title , imageUrl, rating = 2, description = "unknown"} = req.body;
        if(!title || !imageUrl){
            return res.status(400).json({
                ok: false,
                message: `title and image fields are required...`
            })
        }

        const newMovie ={
            title: title,
            imageUrl: imageUrl,
            rating: rating,
            description: description,
            id: Date.now().toString(),
            createdAt: Date.now(),
            updatedAt: null
        }

        movies.unshift(newMovie);
        res.status(201).json({
            ok: true,
            message: `New movie with id ${newMovie.id} is created successfully!!!`,
            data: newMovie
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message:`Error while creating movie...`,
            error: error.message                                                                                                                                                                                                                                 
        })
        
    }
}

const updateMovie =(req, res) =>{
    const updateId = req.params.id;

    try {
        const {title , imageUrl, rating = 2, description = "unknown"} = req.body;

        const updateIdx = movies.findIndex(m => m.id === updateId)
        if(updateIdx === -1) {
            return res.status(404).json({
                ok: false,
                menubar: `movie with id ${updateId} doesn't exist...`
            })
        }
        // let body = req.body;
        if(!title || !imageUrl){
            return res.status(400).json({
                ok: false,
                message:`title and imageUrl are requires fields`
            })
        }

        const updatedMovie ={
            ...movies[updateMovie],
            title: title,
            imageUrl: imageUrl,
            rating: rating,
            description: description,
            id: updateId,
            updatedAt: Date.now()
        }

        movies[updateIdx] = updatedMovie
        res.status(200).json({
            ok: true,
            message:`Movie with id ${updateId} is updated successfully...`,
            data: updatedMovie
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message:`Error while updating movie with id ${updateId}`,
            error: error.message
        })
    }
}

const deleteMovie = (req,res)=>{
    const deleteId = req.params.id;
    try {
        const deleteIdx = movies.findIndex(m => m.id === deleteId)
        if(deleteIdx === -1){
            return res.status(404).json({
                ok: false,
                message:` Movie with id ${deleteId} doesn't exist...`
            })
        }
        movies.splice(deleteIdx, 1);
        res.status(200).json({
            ok: true,
            message:`Movie with id ${deleteId} is deleted successfully...`,
            data: movies[deleteIdx]
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: `Error while deleting movie with id ${deleteId}`,
            error: error.message
        })
    }
}

module.exports = {
     getAllMovies,
     getSingleMovie,
     createMovie,
     updateMovie,
     deleteMovie

 };