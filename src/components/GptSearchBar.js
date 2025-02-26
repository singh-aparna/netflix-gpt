import React, { useRef } from 'react'
import lang from '../utils/languageConstants';
import { useDispatch, useSelector } from 'react-redux';
import openai from '../utils/openai';
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
   // const dispatch = useDispatch();
    const langKey = useSelector(store => store.config.lang);
    const searchText = useRef(null);

    // const searchMovieTMDB = async (movie) => {
    //     const data = await fetch(
    //         "https://api.themoviedb.org/3/search/movie?query=" +
    //         movie +
    //         "&include_adult=false&language=en-US&page=1",
    //         API_OPTIONS
    //     );
    //     const json = await data.json();
    //     return json.results;
    // };

    const handleGptSearchClick = async () => {
        console.log(searchText.current.value)
        const gptQuery =
            "Act as a Movie Recommendation system and suggest some movies for the query : " +
            searchText.current.value +
            ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

            // const gptResults = await openai.chat.completions.create({
            //     messages: [{ role: "user", content: gptQuery }],
            //     model: "gpt-3.5-turbo",
            //   });

            //    console.log(gptResults);


            const gptResults = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    {
                        role: "user",
                        content: "Write a haiku about recursion in programming.",
                    },
                ],
                store: true,
            }).asResponse();
            console.log(gptResults.headers.get('x-ratelimit-limit-tokens'));



        if (!gptResults.choices) {
            // TODO: Write Error Handling
        }

        //copied code
        //console.log(gptResults.choices?.[0]?.message?.content);

        // Andaz Apna Apna, Hera Pheri, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan
       // const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

        // ["Andaz Apna Apna", "Hera Pheri", "Chupke Chupke", "Jaane Bhi Do Yaaro", "Padosan"]

        // For each movie I will search TMDB API

        //const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
        // [Promise, Promise, Promise, Promise, Promise]

        //const tmdbResults = await Promise.all(promiseArray);

       // console.log(tmdbResults);

       // dispatch(
           // addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
        //);
    }

    return (
        <div className=' bg-[#f0f0f0] '>
            <form className='flex flex-col gap-y-4 pt-24 p-5 mx-80 w-1/3' onSubmit={(e) => e.preventDefault()}>
                <input ref={searchText} type='text' className='px-3 py-1 rounded-md' placeholder={lang[langKey].gptSearchPlaceholder} />
                <button className='bg-red-600 text-white rounded-md px-3 py-1' onClick={handleGptSearchClick}>{lang[langKey].search}</button>
            </form>
        </div>
    )
}

export default GptSearchBar;