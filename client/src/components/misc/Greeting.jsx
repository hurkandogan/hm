function Greeting() {
    let msg = '';
    const date = new Date();
    const hour = date.getHours();
    if (hour > 0 && hour < 12) {
        msg = 'Good Morning, ';
    } else if (hour > 12 && hour < 16) {
        msg = 'Good Afternoon, ';
    } else {
        msg = 'Good Evening, ';
    }
    return msg;
}

export default Greeting;