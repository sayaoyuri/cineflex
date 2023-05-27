import styled from "styled-components"
import axios from "axios";
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from "react";

export default function SessionsPage(props) {
    const [getStatus, setGetStatus] = useState(undefined);
    const [movie, setMovie] = useState( {} );
    let { id } = useParams();
    // console.log(movie);

    useEffect(() => {
        axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${id}/showtimes`)
            .then(resp => {
                setMovie(resp.data);
                setGetStatus(true);
            })
            .catch(err => console.log(err));
    }, [])

    if(getStatus === undefined) { // avoids rendering undefined components, while axios is getting the data
        return <div>Carregando</div>; // change to loader or error message
    }

    return (
        <PageContainer>
            Selecione o horário
            <div>
                {movie.days.map(day => (
                    <SessionContainer key={day.id} data-test='movie-day'>
                        <p>{`${day.weekday} - ${day.date}`}</p>
                        <ButtonsContainer>
                            {day.showtimes.map(time => (
                                <Link to={`../assentos/${time.id}`} key={time.id}>
                                    <button data-test='showtime'>{time.name}</button>
                                </Link> )
                            )}
                        </ButtonsContainer>
                    </SessionContainer> )
                )}

            </div>

            <FooterContainer data-test='footer'>
                <div>
                    <img src={movie.posterURL} alt={movie.title} />
                </div>
                <div>
                    <p>{movie.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`