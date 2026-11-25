document.addEventListener('DOMContentLoaded', ()=>{
  const QRCodeStyling = window.QRCodeStyling;
  const el = document.getElementById('qr-code');

  const inputs = {
    data: document.getElementById('data'),
    size: document.getElementById('size'),
    dotColor: document.getElementById('dotColor'),
    bgColor: document.getElementById('bgColor'),
    dotType: document.getElementById('dotType'),
    errorLevel: document.getElementById('errorLevel'),
    logoFile: document.getElementById('logoFile'),
    generate: document.getElementById('generate'),
    downloadPng: document.getElementById('downloadPng'),
    downloadSvg: document.getElementById('downloadSvg')
  };

  let logoDataUrl = null;

  const qr = new QRCodeStyling({
    width: Number(inputs.size.value),
    height: Number(inputs.size.value),
    type: 'canvas',
    data: inputs.data.value,
    image: undefined,
    qrOptions: { errorCorrectionLevel: inputs.errorLevel.value },
    dotsOptions: {
      color: inputs.dotColor.value,
      type: inputs.dotType.value
    },
    backgroundOptions: {
      color: inputs.bgColor.value
    },
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 5
    }
  });

  qr.append(el);

  function applyOptions(){
    const opts = {
      width: Number(inputs.size.value),
      height: Number(inputs.size.value),
      data: inputs.data.value,
      qrOptions: { errorCorrectionLevel: inputs.errorLevel.value },
      dotsOptions: { color: inputs.dotColor.value, type: inputs.dotType.value },
      backgroundOptions: { color: inputs.bgColor.value }
    };
    if(logoDataUrl){ opts.image = logoDataUrl; }
    qr.update(opts);
  }

  inputs.generate.addEventListener('click', (e)=>{ e.preventDefault(); applyOptions(); });

  inputs.downloadPng.addEventListener('click', ()=>{
    qr.download({ name: 'qr-code', extension: 'png' });
  });

  inputs.downloadSvg.addEventListener('click', ()=>{
    qr.download({ name: 'qr-code', extension: 'svg' });
  });

  inputs.logoFile.addEventListener('change', (ev)=>{
    const f = ev.target.files && ev.target.files[0];
    if(!f) { logoDataUrl = null; applyOptions(); return; }
    const reader = new FileReader();
    reader.onload = function(evt){
      logoDataUrl = evt.target.result;
      applyOptions();
    };
    reader.readAsDataURL(f);
  });

  // live update for some controls
  inputs.dotColor.addEventListener('input', applyOptions);
  inputs.bgColor.addEventListener('input', applyOptions);
  inputs.dotType.addEventListener('change', applyOptions);
  inputs.errorLevel.addEventListener('change', applyOptions);
  inputs.size.addEventListener('change', applyOptions);
  inputs.data.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') applyOptions(); });
});
