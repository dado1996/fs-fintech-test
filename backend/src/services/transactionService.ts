import sequelize from "../config/db";
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

export const transfer = async (
  deliverer: string,
  recipient: string,
  amount: number
) => {
  const t = await sequelize.transaction();
  const userDeliverer = await User.findOne({
    where: {
      email: deliverer,
    },
  });

  const userRecipient = await User.findOne({
    where: {
      email: recipient,
    },
  });

  if (!userDeliverer || !userRecipient) {
    return { status: 404, message: "The recipient does not exists" };
  }

  const resultDeliverer = await User.update(
    {
      balance: userDeliverer.balance - amount,
    },
    {
      where: {
        email: deliverer,
      },
      returning: ["balance"],
    }
  );

  const resultRecipient = await User.update(
    {
      balance: userRecipient.balance + amount,
    },
    {
      where: {
        email: recipient,
      },
    }
  );
  await t.commit();

  return {
    status: 200,
    message: "Transfer completed",
    data: {
      balance: resultDeliverer[1][0].dataValues.balance,
    },
  };
};

export const withdraw = async (email: string, amount: number) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      status: 404,
      message: "User not found",
    };
  }

  if (user.balance - amount <= 0) {
    return {
      status: 400,
      message: "Insuficient funds",
    };
  }

  const result = await User.update(
    {
      balance: user.balance - amount,
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
    message: "Withdrawal completed",
    data: {
      balance: result[1][0].dataValues.balance,
    },
  };
};
