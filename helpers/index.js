function buildRequestDetection(imageUri){
    return {
        requests: [
          {
            image: {
              source: {
                imageUri
              }
            },
            features: [
              {
                type: "DOCUMENT_TEXT_DETECTION"
              }
            ],
            imageContext: {
              languageHints: ["km"]
            }
          }
        ]
      };
}

module.exports = buildRequestDetection;