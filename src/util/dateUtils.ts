
export const convertDate = (date: string) => new Date(date).toDateString();

//Depending on region can reformat date 
export const formatDate = (date: string, locale: string) => {
    return new Intl.DateTimeFormat(locale).format(new Date(date));
};