const initialState = {
  posts: [],
};

const POSTDATA = "POSTDATA";

export const PostLoad = (data) => ({
  type: POSTDATA,
  data,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case POSTDATA:
      return {
        ...state,
        posts: action.data,
      };
    default:
      return state;
  }
}
