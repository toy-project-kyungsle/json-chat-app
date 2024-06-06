import styled from 'styled-components';

const normalConversationBackColor = '#fff';
const selectedConversationBackColor = '#ddd';
const hoverConversationBackColor = '#eee';
const subFontColor = '#555';

// 주어진 속성과 호버 상태에 따라 대화의 배경색을 반환합니다.
const getConversationBackColor = (props: { isSelected: boolean }, isHover: boolean): string => {
    switch (true) {
        case props?.isSelected === true:
            return selectedConversationBackColor;
        case isHover:
            return hoverConversationBackColor;
        default:
            return normalConversationBackColor;
    }
};

const ConversationList = styled.div`
    width: 40%;
    height: 100%;
    overflow-y: scroll;
`;

const ConversationBox = styled.div<{ isSelected: boolean }>`
    display: flex;
    height: 60px;
    overflow: hidden;
    padding: 6px 10px;
    box-sizing: border-box;
    background-color: ${(props) => getConversationBackColor(props, false)};

    &:hover {
        cursor: pointer;
        background-color: ${(props) => getConversationBackColor(props, true)};
    }
`;

const ProfileImage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 6px;
    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
`;

const ConversationInfo = styled.div`
    flex: 1;
    overflow: hidden;
    .titleBox {
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        span {
            font-size: 1em;
        }
    }

    .userInfoBox {
        display: flex;
        justify-content: space-between;
        overflow: hidden;

        .userName,
        .updatedAt {
            font-size: 0.8em;
            color: ${subFontColor};
        }
        .userName {
            flex: 1;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
`;

export default {
    ConversationList,
    ConversationBox,
    ProfileImage,
    ConversationInfo,
};
