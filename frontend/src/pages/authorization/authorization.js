import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import styled from "styled-components";
import { AuthError, Button, H2, Input } from "../../components";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../actions";
import { selectUserRole } from "../../selecrtors";
import { ROLE } from "../../constans/roleId";
import { useResetForm } from "../../hooks/useResetForm";
import { request } from "../../utils";

const authSchemeForm = yup.object().shape({
    login: yup
        .string()
        .required("Поле обязательно для заполнения")
        .matches(
            /^\w+$/,
            "Неверно заполнен логин. Допускаются только буквы и цифры",
        )
        .min(3, "Минумум 3 смвола")
        .max(15, "Максимум 15 символов"),
    password: yup
        .string()
        .required("Поле обязательно для заполнения")
        .matches(
            /^[\w#%]+$/,
            "Неверно заполнен пароль. Допускаются буквы, цифры и знаки #,%.",
        )
        .min(6, "Минимун 6 символов")
        .max(30, "Максимум 30 символов"),
});

const StyledLink = styled(Link)`
    text-align: center;
    text-decoration: underline;
    margin: 20px 0;
    font-size: 18px;
`;

const AuthorizationContainer = ({ className }) => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: "",
            password: "",
        },
        resolver: yupResolver(authSchemeForm),
    });

    const [serverError, setServerError] = useState(null);

    const onSubmit = ({ login, password }) => {
        request("/api/login", "POST", {login, password}).then(({ error, user }) => {
            if (error) {
                setServerError(`Ошибка запроса: ${error}`);
                return;
            }

            dispatch(setUser(user));
            sessionStorage.setItem("userData", JSON.stringify(user));
        });
    };

    const formError = errors?.login?.message || errors?.password?.message;
    const errorMessage = formError || serverError;

    const dispatch = useDispatch();

    useResetForm(reset);

    const roleId = useSelector(selectUserRole);

    if (roleId !== ROLE.GUEST) {
        return <Navigate to="/" />;
    }

    return (
        <div className={className}>
            <H2>Авторизация</H2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="text"
                    placeholder="Логин..."
                    {...register("login", {
                        onChange: () => setServerError(null),
                    })}
                />
                <Input
                    type="password"
                    placeholder="Пароль..."
                    {...register("password", {
                        onChange: () => setServerError(null),
                    })}
                />
                <Button type="submit" disabled={!!formError}>
                    Авторизоваться
                </Button>
                {errorMessage && <AuthError>{errorMessage}</AuthError>}
                <StyledLink to="/register">Регистрация</StyledLink>
            </form>
        </div>
    );
};

export const Authorization = styled(AuthorizationContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;

    & > form {
        display: flex;
        flex-direction: column;
        width: 260px;
    }
`;
