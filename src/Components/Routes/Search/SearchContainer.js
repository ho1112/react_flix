import React from "react";
import SearchPresenter from "./SearchPresenter";
import {moviesApi, tvApi} from "../../../api";

export default class extends React.Component {
    state = {
        movieResult : null,
        tvResults : null,
        searchTerm : "",
        loading : false,
        error : null
    };

    handleSubmit = event => {
        event.preventDefault();
        const {searchTerm} = this.state;
        if (searchTerm !== "") {
            this.seachByTerm();
        }
    };

    updateTerm = event => {
        const {
            target : {value}
        } = event;
        this.setState({
            searchTerm: value
        });
    };

    searchByTerm = async () => {
        const {searchTerm} = this.state;
        this.setState({ loading: true });
        try {
            const {
                data: {results: movieResults}
            } = await moviesApi.search(searchTerm);
            const {
                data: {results: tvResults}
            } = await tvApi.search(searchTerm);
            this.setState({
                movieResults,
                tvResults
            });    
        } catch {
            this.setState({ error: "Can't find results"});
        } finally {
            this.setState({loading: false});
        }
    };
    //State의 값이 바뀌면(setState) render가 자동실행되어 화면을 갱신해준다

    render() {
        const {movieResults, tvResults, searchTerm, loading, error} = this.state;
        return (
            <SearchPresenter
                movieResults={movieResults}
                tvResults={tvResults}
                searchTerm={searchTerm}
                loading={loading}
                error={error}
                handleSubmit={this.handleSubmit}
                updateTerm={this.updateTerm}
            />
        );
    }

}