import { Link, useNavigate } from "react-router-dom";
import { Button, Icon } from "../../../../components";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
    selectUserRole,
    selectUserLogin,
} from "../../../../selecrtors";
import { logout } from "../../../../actions";
import { ROLE } from "../../../../constans/roleId";
import { checkAccess } from "../../../../utils";

const RightAligned = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const UserName = styled.div`
    font-size: 18px;
    font-weight: bold;
`;

const ControlPanelContainer = ({ className }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const roleId = useSelector(selectUserRole);
    const login = useSelector(selectUserLogin);

    const isAdmin = checkAccess([ROLE.ADMIN], roleId);

    const onLogout = () => {
        dispatch(logout());
        sessionStorage.removeItem("userData");
    };

    return (
        <div className={className}>
            <RightAligned>
                {roleId === ROLE.GUEST ? (
                    <Button>
                        <Link to="/login">Войти</Link>
                    </Button>
                ) : (
                    <>
                        <UserName>{login}</UserName>

                        <Icon
                            onClick={onLogout}
                            id="fa-sign-out"
                            margin="0 0 0 10px"
                        />
                    </>
                )}
            </RightAligned>
            <RightAligned>
                <Icon
                    onClick={() => navigate(-1)}
                    id="fa-backward"
                    margin="10px 0 0 0"
                />
                {isAdmin && (
                    <>
                        <Link to="/post">
                            <Icon id="fa-file-text-o" margin="10px 0 0 16px" />
                        </Link>
                        <Link to="/users">
                            <Icon id="fa-users" margin="10px 0 0 16px" />
                        </Link>
                    </>
                )}
            </RightAligned>
        </div>
    );
};

export const ControlPanel = styled(ControlPanelContainer)``;
