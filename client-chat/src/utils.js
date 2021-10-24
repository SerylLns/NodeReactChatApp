export const dateParser = (dateToParse) => {
  let options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "long",
    // year: "numeric",
    month: "short",
    day: "numeric",
  };

  let timestamp = Date.parse(dateToParse);
  let date = new Date(timestamp).toLocaleDateString("fr-FR", options);
  return date.toString();
};

export const timestampParser = (time) => {
  let options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "short",
    //  year: "numeric",
    month: "short",
    day: "numeric",
  };
  let date = new Date(time).toLocaleDateString("fr-FR", options);
  return date.toString();
};

export const isEmpty = (value) => {
  // SI VALUE est vide return true
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

export const youtubeVideo = (message) => {
  let findLink = message.split(" ");
  for (let i = 0; i < findLink.length; i++) {
    if (
      findLink[i].includes("https://www.yout") ||
      findLink[i].includes("https://yout")
    ) {
      let embed = findLink[i].replace("watch?v=", "embed/");
      const result = {
        youtubeLink: embed,
        originalLink: message
      }
      return result;
    } else return null;
  }
};
export const getChatroomUsers = (currentChatroom, users) => {
  const userIds = currentChatroom.userIds;
  let result = [];
  userIds.forEach((id) => {
    users.forEach(user => {
      if (id === user._id) {
        result.push(user);
      }
    });
  });
  return result;
 };