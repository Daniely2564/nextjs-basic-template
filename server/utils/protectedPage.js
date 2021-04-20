import { populateUser } from "./populateUser";

export const protectedPage = (cb) => async (ctx) => {
  const { user } = await populateUser(ctx);
  if (user) {
    return cb(user);
  } else {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
};
