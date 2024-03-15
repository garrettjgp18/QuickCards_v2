// Having to use pdf.js instead of pdfReader because pdfReader doesnt support HTTP only Node.js
// Documentation: https://mozilla.github.io/pdf.js/
import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import 'pdfjs-dist/legacy/build/pdf.worker.entry';

function FileUploadForm() {
  const [file, setFile] = useState(null);

  // Handles file selection, ensuring it's a PDF and not larger than 20MB
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile.type !== "application/pdf") {
      alert("Please select a PDF file.");
      return;
    }
    if (selectedFile.size > 20 * 1024 * 1024) { // 20MB in bytes
      alert("File size must not exceed 20MB.");
      return;
    }
    setFile(selectedFile);
  };

  // Process the PDF file to extract text
  // processPDF uses a FileReader to read the selected file as an ArrayBuffer. This format is required by PDF.js to process the file.
  const processPDF = async (pdfFile) => {
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const typedArray = new Uint8Array(e.target.result);
        const loadingTask = pdfjsLib.getDocument({data: typedArray});
        const pdf = await loadingTask.promise;

        let allTextArrays = []; // Holds arrays of words, each limited to 5000 words
        let currentTextArray = [];
        let wordCount = 0;

        // Loop through each page in the PDF
        // This loop iterates through each page of the PDF document using pdf.getPage(pageNum). For each page, it retrieves the text content page.getTextContent()
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          
          // Split text content into words and manage the arrays
          // The text content contains items, each representing a block of text. The script iterates through these items, splitting the text into individual words
          textContent.items.forEach((item) => {
            item.str.split(/\s+/).forEach((word) => {
              if (wordCount >= 5000) {
                allTextArrays.push(currentTextArray);
                currentTextArray = [];
                wordCount = 0;
              }
              currentTextArray.push(word);
              wordCount++;
            });
          });
        }
        // Add the last array if it has words
        if (currentTextArray.length > 0) {
          allTextArrays.push(currentTextArray);
        }

        console.log(allTextArrays); // Log the arrays of words
      };
      reader.readAsArrayBuffer(pdfFile);
    } catch (error) {
      console.error('Error processing PDF:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a PDF file first!');
      return;
    }
    await processPDF(file); // Process the selected PDF file
  };

  // Need to figure out button name
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="application/pdf" />
        <button type="submit">Upload and Process PDF</button>
      </form>
    </div>
  );
}

export default FileUploadForm;
