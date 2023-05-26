import styled from "styled-components"
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

export default function SeatsPage( {setTickets} ) {
    const [session, setSession] = useState(undefined)
    const [selectedSeats, setSelectedSeats] = useState( [] );
    const [seatsNames, setSeatsNames] = useState( [] );
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const navigate = useNavigate();
    let { id } = useParams();

    useEffect(() => {
        axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${id}/seats`)
            .then(resp => setSession(resp.data));
    }, [])

    function reserveSeats(ev) {
        ev.preventDefault();
        if(selectedSeats.length !== 0) {
            const seatsId = selectedSeats.map(seat => seat.id);
            const request ={ ids: seatsId, name, cpf };

            axios.post('https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many', request)
                .then(resp => {
                    console.log(resp);
                    setTickets({
                        session,
                        name, 
                        cpf,
                        seatsNames 
                        }
                    );
                    navigate('../success');
                })
                .catch(err => console.log(err));
        } else {
            // alert('Selecione ao menos um assento');
            console.log('Selecione ao menos um assento');
        }
    }

    function selectSeat(seat) {
        if(!selectedSeats.includes(seat.id) && seat.isAvailable) {
            setSelectedSeats( [...selectedSeats, seat.id] );
            setSeatsNames( [... seatsNames, seat.name] );
    
        } // unselectSeat
    }

    if(session === undefined) {
        return <p>Carregando...</p>
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {session.seats.map(seat => (
                    <SeatItem 
                        key={seat.id}
                        onClick={() => selectSeat(seat)} 
                        isAvailable={seat.isAvailable}
                        isSelected={selectedSeats.includes(seat.id)} 
                    >
                        {seat.name}
                    </SeatItem>
                )
                )}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle isAvailable={'selected'}/>
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle isAvailable={true}/>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle isAvailable={false}/>
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer onSubmit={reserveSeats}>
                <label htmlFor='name'>Nome do Comprador:</label>
                <input type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    id='name'
                    placeholder="Digite seu nome..."
                    minLength={3}
                />

                <label htmlFor='cpf'>CPF do Comprador:</label>
                <input onChange={(e) => setCpf(e.target.value)} 
                    value={cpf} 
                    id='cpf'
                    placeholder="Digite seu CPF..." 
                    required minLength={11} 
                    maxLength={11}
                />
                <button type="submit">Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={session.movie.posterURL} alt={session.movie.title} />
                </div>
                <div>
                    <p>{session.movie.title}</p>
                    <p>{`${session.day.weekday} - ${session.name}`}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props => props.isAvailable === 'selected' ? '#0E7D71' : props.isAvailable ? '#7B8B99' : '#F7C52B'};
    background-color: ${props => props.isAvailable === 'selected' ? '#1AAE9E' : props.isAvailable ? '#C3CFD9' : '#FBE192'};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid ${props => !props.isAvailable ? '#F7C52B' : props.isSelected ? '#0E7D71' : '#7B8B99' };
    background-color: ${props => !props.isAvailable ? '#FBE192' : props.isSelected ? '#1AAE9E' : '#C3CFD9' };
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
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