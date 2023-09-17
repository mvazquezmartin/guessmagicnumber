const alert = (status, title, message) => {
  Swal.fire({
    icon: status,
    title: title,
    text: message,
    color: "#bbb",
  })
};

export { alert };
