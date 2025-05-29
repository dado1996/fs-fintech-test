import User from "../models/user";

export const deposit = async (email: string, amount: number) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      status: 404,
      message: "User does not exists",
    };
  }

  const newBalance = await User.update(
    {
      balance: user.balance + amount,
    },
    {
      where: {
        email,
      },
      returning: ["balance"],
    }
  );

  return {
    status: 200,
    message: "The balance has been updated",
    data: {
      balance: newBalance[1][0].dataValues.balance,
    },
  };
};
