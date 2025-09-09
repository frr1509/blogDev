import { useEffect, useState } from "react";
import styled from "styled-components";

const FooterContainer = ({ className }) => {
    const [city, setCity] = useState("");
    const [temperature, setTemperature] = useState("");
    const [weather, setWeather] = useState("");
    useEffect(() => {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&lang=ru&appid=fe0cd30c8664f4d8833bc9cd9f0c1413",
        )
            .then((res) => res.json())
            .then(({ name, main, weather }) => {
                setCity(name);
                setTemperature(Math.round(main.temp));
                setWeather(weather[0].description);
            });
    }, []);
    return (
        <footer className={className}>
            <div>
                <div>Блог веб-разработчика</div>
                <div>wev@developer.ru</div>
            </div>
            <div>
                <div>
                    {city},{" "}
                    {new Date().toLocaleString("ru", {
                        day: "numeric",
                        month: "long",
                    })}
                </div>
                <div>
                    {temperature} градусов, {weather}
                </div>
            </div>
        </footer>
    );
};

export const Footer = styled(FooterContainer)`
    display: flex;
    position: fixed;
    bottom: 0;
    justify-content: space-between;
    align-items: center;
    width: 1000px;
    height: 120px;
    font-weight: bold;
    padding: 20px 40px;
    box-shadow: 0px 2px 17px #000;
    background-color: #fff;
`;
