document.addEventListener('DOMContentLoaded',()=>{
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(ele =>{
        ele.style.opacity = '0';
        setTimeout(()=>{
            ele.parentNode.removeChild(ele);
        }, 5000);
    });
});

async function showConfirmMsg(title = '', msg = '', formname){
    const resp = await Swal.fire({
        title: title || 'Are you sure?',
        text: msg ||"You won\'t be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        //confirmButtonColor: '#3085d6',
        //cancelButtonColor: '#d33',
        //confirmButtonText: 'Yes, delete it!'
      });
if(resp.value){
    if(document.forms[formname]){
        document.forms[formname].submit();
    }
}
}
