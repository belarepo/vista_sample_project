const pass_input = document.querySelector('#input-password');
if (pass_input) {
  document.querySelector('.eye-icon').addEventListener('click', e => {
    if (pass_input.type === 'password') {
      e.target.src = '/assets/icons/eye_slash.svg';
      pass_input.type = 'text';
    } else {
      e.target.src = '/assets/icons/eye.svg';
      pass_input.type = 'password';
    }
  });
}
