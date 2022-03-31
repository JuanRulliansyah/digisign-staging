import moment from "moment";

export const dateFormat = (date, format=null) => {
    if(!format) {
        format = "DD MMMM YYYY HH:mm:ss";
    }
    return moment(date).format(format);
}