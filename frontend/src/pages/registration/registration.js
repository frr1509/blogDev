import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import styled from "styled-components";
import { AuthError, Button, H2, Input } from "../../components";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../actions";
import { selectUserRole } from "../../selecrtors";
import { ROLE } from "../../constans/roleId";
import { useResetForm } from "../../hooks/useResetForm";
import { request } from "../../utils";

const regSchemeForm = yup.object().shape({
    login: yup
        .string()
        .required("Поле обязательно для заполнения")
        .matches(
            /^\w+$/,
            "Неверно заполнен логин. Допускаются только буквы и цыфры",
        )
        .min(3, "Минумум 3 смвола")
        .max(15, "Максимум 15 символов"),
    password: yup
        .string()
        .required("Поле обязательно для заполнения")
        .matches(
            /^[\w#%]+$/,
            "Неверно заполнен пароль. Допускаются буквы, цыфры и знаки #,%.",
        )
        .min(6, "Минимун 6 символов")
        .max(30, "Максимум 30 символов"),
    passcheck: yup
        .string()
        .required("Поле обязательно для заполнения")
        .oneOf([yup.ref("password"), null], "Пароли не совпадают"),
});

const RegistrationContainer = ({ className }) => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: "",
            password: "",
            passcheck: "",
        },
        resolver: yupResolver(regSchemeForm),
    });

    const [serverError, setServerError] = useState(null);

    const onSubmit = ({ login, password }) => {
        request("/api/register", "POST", { login, password }).then(
            ({ error, user }) => {
                if (error) {
                    setServerError(`Ошибка запроса: ${error}`);
                    return;
                }

                dispatch(setUser(user));
                sessionStorage.setItem("userData", JSON.stringify(user));
            },
        );
    };

    const formError =
        errors?.login?.message ||
        errors?.password?.message ||
        errors?.passcheck?.message;
    const errorMessage = formError || serverError;

    const dispatch = useDispatch();

    useResetForm(reset);

    const roleId = useSelector(selectUserRole);

    if (roleId !== ROLE.GUEST) {
        return <Navigate to="/" />;
    }

    return (
        <div className={className}>
            <H2>Регистрация</H2>
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
                <Input
                    type="password"
                    placeholder="Повтор пароля..."
                    {...register("passcheck", {
                        onChange: () => setServerError(null),
                    })}
                />
                <Button type="submit" disabled={!!formError}>
                    Зарегистрироваться
                </Button>
                {errorMessage && <AuthError>{errorMessage}</AuthError>}
            </form>
        </div>
    );
};

export const Registration = styled(RegistrationContainer)`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    & > form {
        display: flex;
        flex-direction: column;
        width: 260px;
    }
`;
