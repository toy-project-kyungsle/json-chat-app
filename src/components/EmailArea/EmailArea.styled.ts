import styled from 'styled-components';

const EmailArea = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 60%;
    height: 100%;
`;

const EmailList = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: scroll;
    gap: 20px;
    padding: 10px 20px 0;
    box-sizing: border-box;
`;

const EnterBox = styled.div`
    display: flex;

    .form {
        display: flex;
        width: 100%;
        height: 65px;
    }
    .textarea {
        flex: 1;
        padding: 6px;
    }
    .button {
        width: 50px;
    }
`;

const ConversationBox = styled.div<{ fromUser: boolean }>`
    display: flex;
    justify-content: ${(props) => (props.fromUser ? 'flex-start' : 'flex-end')};
`;

const ProfileImgBox = styled.div`
    margin-right: 15px;
    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
`;

const TalkBox = styled.div<{ fromUser: boolean }>`
    max-width: 300px;

    .userName {
        margin-bottom: 5px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        span {
            font-size: 0.9em;
            text-align: left;
            line-height: 100%;
        }
    }
    .text {
        position: relative;
        border-radius: 8px;
        padding: 8px 12px;
        background-color: #eeeeee;

        span {
            white-space: pre-wrap;
            text-align: left;
        }
    }

    ${(props) =>
        props.fromUser
            ? `
    .text::after {
        content: '';
        position: absolute;
        top: 0px; /* 상단으로 이동 */
        left: 0%;
        transform: translateX(-50%);
        border-width: 8px;
        border-style: solid;
        border-color: #eeeeee transparent transparent transparent; /* 위 방향으로 변경 */
    }
    `
            : ''}
`;

export default {
    EmailArea,
    EmailList,
    EnterBox,
    ConversationBox,
    ProfileImgBox,
    TalkBox,
};
