
    // 1) Copy your candidate list from candidate.html here:
    const candidates = [
        "Aliyu Bashir Lawan",
        "Abdulmalik Abdulfatah",
        "Mujahid Auwal Karaye",
        "Muhammad Almubasshir",
        "Adam Aliyu",
        "Babagana Adam"
        // …add the rest of your approved names
      ];
  
      // Populate the dropdown
      const studentSelect = document.getElementById('student');
      candidates.forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        studentSelect.appendChild(opt);
      });
  
      document.getElementById('certForm').addEventListener('submit', e => {
        e.preventDefault();
        const name   = studentSelect.value;
        const certNo = document.getElementById('certNumberInput').value.trim();
        const date   = new Date().toLocaleDateString();
  
        // Fill overlays
        document.getElementById('certName').textContent = name;
        document.getElementById('certDate').textContent = date;
        document.getElementById('certNo').textContent   = certNo;
  
        // Generate QR
        const qrDiv = document.getElementById('qrcode');
        qrDiv.innerHTML = '';
        new QRCode(qrDiv, {
          text: `Name: ${name}\nNo: ${certNo}\nDate: ${date}`,
          width: 100,
          height: 100,
          correctLevel: QRCode.CorrectLevel.H
        });
  
        // Show certificate & buttons
        document.getElementById('certificate').style.display = 'block';
        document.getElementById('downloadBtn').style.display  = 'inline-block';
        document.getElementById('printBtn').style.display     = 'inline-block';
      });
  
      // Download as PNG via html2canvas
      document.getElementById('downloadBtn').addEventListener('click', () => {
        html2canvas(document.getElementById('certificate'), { scale: 2 }).then(canvas => {
          canvas.toBlob(blob => {
            const link = document.createElement('a');
            link.download = `certificate-${Date.now()}.png`;
            link.href = URL.createObjectURL(blob);
            link.click();
          });
        });
      });
  
      // Print
      document.getElementById('printBtn').addEventListener('click', () => window.print());
