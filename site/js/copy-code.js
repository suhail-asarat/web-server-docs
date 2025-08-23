// Code block copy functionality
document.addEventListener('DOMContentLoaded', function () {
  // Find all code blocks
  const codeBlocks = document.querySelectorAll('pre code, .codehilite code, .highlight code');

  codeBlocks.forEach(function (codeBlock) {
    // Get the parent pre element
    const preElement = codeBlock.closest('pre') || codeBlock.parentElement;

    // Skip if already processed or if it's inline code
    if (preElement.querySelector('.copy-button') || preElement.tagName !== 'PRE') {
      return;
    }

    // Create wrapper div
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';

    // Insert wrapper before the pre element
    preElement.parentNode.insertBefore(wrapper, preElement);

    // Move pre element inside wrapper
    wrapper.appendChild(preElement);

    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.textContent = 'Copy';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');

    // Add click event listener
    copyButton.addEventListener('click', function () {
      // Get the code text
      const codeText = codeBlock.textContent || codeBlock.innerText;

      // Use the Clipboard API if available
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(codeText).then(function () {
          showCopySuccess(copyButton);
        }).catch(function (err) {
          console.error('Failed to copy text: ', err);
          fallbackCopyTextToClipboard(codeText, copyButton);
        });
      } else {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(codeText, copyButton);
      }
    });

    // Add button to wrapper
    wrapper.appendChild(copyButton);
  });
});

// Fallback copy method for older browsers
function fallbackCopyTextToClipboard(text, button) {
  const textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      showCopySuccess(button);
    } else {
      console.error('Fallback: Could not copy text');
    }
  } catch (err) {
    console.error('Fallback: Unable to copy', err);
  }

  document.body.removeChild(textArea);
}

// Show copy success feedback
function showCopySuccess(button) {
  const originalText = button.textContent;
  button.textContent = 'Copied!';
  button.classList.add('copied');

  setTimeout(function () {
    button.textContent = originalText;
    button.classList.remove('copied');
  }, 2000);
}
