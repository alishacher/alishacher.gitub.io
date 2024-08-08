function copyToClipboard() {
  const textarea = document.getElementById("dailyExchange");

  textarea.select();
  textarea.setSelectionRange(0, 99999);

  navigator.clipboard
    .writeText(textarea.value)
    .then(() => {
      alert("Text copied to clipboard");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}

// async function getCursOnDate(dateTime) {
//   const url = 'http://localhost:3000/proxy';
//   const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
//     <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
//       <soap12:Body>
//         <GetCursOnDateXML xmlns="http://web.cbr.ru/">
//           <On_date>2024-08-02T00:00:00</On_date>
//         </GetCursOnDateXML>
//       </soap12:Body>
//     </soap12:Envelope>
//   `;

//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'text/plain' // Отправляем как plain text на прокси
//       },
//       body: soapRequest
//     });

//     if (response.ok) {
//       const responseText = await response.text();
//       const parser = new DOMParser();
//       const xmlDoc = parser.parseFromString(responseText, "application/xml");
//       console.log(xmlDoc);
//     } else {
//       console.error('HTTP error', response.status, response.statusText);
//     }
//   } catch (error) {
//     console.error('Fetch error:', error);
//   }
// }

// getCursOnDate('2024-08-02T00:00:00');

async function getCursOnDate(dateTime) {
  const url = "https://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx";
  const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
      <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
        <soap12:Body>
          <GetCursOnDateXML xmlns="http://web.cbr.ru/">
            <On_date>${dateTime}</On_date>
          </GetCursOnDateXML>
        </soap12:Body>
      </soap12:Envelope>
    `;

  const headers = {
    "Content-Type": "application/soap+xml; charset=utf-8",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: soapRequest,
    });

    const responseText = await response.text();
    console.log(responseText)
    if (response.ok) {
      const responseText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(responseText, "application/xml");
      console.log(xmlDoc);
    } else {
      console.error("HTTP error", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

// Пример вызова функции с датой в формате .NET System.DateTime
getCursOnDate("2024-08-02T00:00:00");
