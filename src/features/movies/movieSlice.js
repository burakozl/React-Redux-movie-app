import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from '../../common/apis/movieApi';

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async (term) => {
    const response = await movieApi.get(
        `?apiKey=${process.env.REACT_APP_API_KEY}&s=${term}&type=movie`
    );
    return response.data;

});

export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async (term) => {
    const response = await movieApi.get(
        `?apiKey=${process.env.REACT_APP_API_KEY}&s=${term}&type=series`
    );
    return response.data;

});

export const fetchAsyncMovieOrShowDetail = createAsyncThunk('movies/fetchAsyncMovieOrShowDetail', async (id) => {
    const response = await movieApi.get(
        `?apiKey=${process.env.REACT_APP_API_KEY}&i=${id}&Plot=full`
    );
    return response.data;

});

const initialState = {
    movies: {},
    shows: {},
    selectedMovieOrShow: {},
    status: 'idle'
}

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        removeSeletedMovieOrShow: (state) => {
            state.selectedMovieOrShow = {};
        }
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
            return { ...state, movies: payload, status: "successed" };
        },
        [fetchAsyncMovies.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
        [fetchAsyncShows.fulfilled]: (state, { payload }) => {
            return { ...state, shows: payload };
        },
        [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
            return { ...state, selectedMovieOrShow: payload };
        },
    }
});

export const { removeSeletedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieorShow = (state) => state.movies.selectedMovieOrShow;
export default movieSlice.reducer;