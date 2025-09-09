export const sunitizeContent = (content) =>
    content
        .replaceAll("&nbsp;", " ")
        .replace(/ +/, " ")
        .replaceAll("<div><br></div>", "\n")
        .replaceAll("<div>", "\n")
        .replaceAll("</div>", "");
