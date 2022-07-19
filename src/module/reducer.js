const initialState = {
  nickname: "",
};

const NICKNAME = "NICKNAME";

export const NickAction = (data) => ({
  type: NICKNAME,
  data,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case NICKNAME:
      return {
        ...state,
        nickname: action.data,
      };
    default:
      return state;
  }
}
