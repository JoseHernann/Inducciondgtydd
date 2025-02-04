import Swal from 'sweetalert2'

export const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast',
    container: 'swal-container'
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  width: '34rem'
})
