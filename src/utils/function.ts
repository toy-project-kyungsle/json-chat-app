/**
 * 현재 URL에서 해시 경로를 가져옵니다.
 *
 * @return {string} URL에서 추출된 해시 경로입니다.
 */
export const getHashRoute = () => {
    const hash = window.location.hash; // 현재 URL의 해시 부분을 가져옴
    const route = hash.substring(1); // 해시 부분에서 '#' 문자를 제외한 나머지를 추출
    return route;
};
