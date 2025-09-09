import styled from "styled-components";
import { Icon } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { openModal, removePostAsync, CLOSE_MODAL } from "../../../../actions";
import { useNavigate } from "react-router-dom";
import { checkAccess } from "../../../../utils";
import { ROLE } from "../../../../constans";
import { selectUserRole } from "../../../../selecrtors";

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const roleId = useSelector(selectUserRole);

    const isAdmin = checkAccess([ROLE.ADMIN], roleId);

    const onPostRemove = (id) => {
        dispatch(
            openModal({
                text: "Удалить cтатью?",
                onConfirm: () => {
                    dispatch(removePostAsync(id)).then(() => {
                        navigate(`/`);
                    });
                    dispatch(CLOSE_MODAL);
                },
                onCancel: () => dispatch(CLOSE_MODAL),
            }),
        );
    };
    return (
        <div className={className}>
            <div className="published-at">
                {publishedAt && (
                    <Icon id="fa-calendar-o" size="18px" margin="0 7px 0 0" />
                )}
                {publishedAt}
            </div>
            {isAdmin && (
                <div className="buttons">
                    {editButton}
                    {publishedAt && (
                        <Icon
                            id="fa-trash-o"
                            size="21px"
                            onClick={() => onPostRemove(id)}
                            margin="0 0 0 7px"
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export const SpecialPanel = styled(SpecialPanelContainer)`
    display: flex;
    justify-content: space-between;
    margin: ${({ margin }) => margin};

    & .published-at {
        display: flex;
        font-size: 18px;
    }

    & .buttons {
        display: flex;
    }

    & i {
        position: relative;
        top: -1px;
    }
`;
