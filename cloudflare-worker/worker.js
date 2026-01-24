// Cloudflare Worker — Edge proxy for granth.tech
// Routes CLI tools (curl, wget, httpie) to terminal portfolio
// Routes browsers to Vercel-hosted React app

const VERCEL_ORIGIN = "https://granth.vercel.app";

// Pre-generated terminal portfolio output (Lip Gloss with ANSI codes)
// Base64-encoded to preserve escape sequences
const TERMINAL_OUTPUT_B64 = `ChtbMTszNm1HcmFudGggQWdhcndhbBtbMG0KG1sxOzk3bUJhY2tlbmQgRW5naW5lZXIbWzBtIBtbOTBtwrcbWzBtIBtbOTBtU3lzdGVtcyDCtyBBUElzIMK3IFNjYWxlG1swbQoKG1sxOzM2bUNPTlRBQ1QbWzBtChtbOTBt4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAG1swbQogIBtbMzNtRW1haWwbWzBtICAgICAgICBncmFudGhjb2Rlc0BnbWFpbC5jb20KICAbWzMzbUdpdEh1YhtbMG0gICAgICAgZ2l0aHViLmNvbS9oZXktZ3JhbnRoCiAgG1szM21MaW5rZWRJbhtbMG0gICAgIGxpbmtlZGluLmNvbS9pbi9ncmFudGgtYWdhcndhbAogIBtbMzNtV2ViG1swbSAgICAgICAgICBncmFudGgudGVjaAoKG1sxOzM2bVNUQUNLG1swbQobWzkwbeKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgBtbMG0KICAbWzMzbUxhbmd1YWdlcxtbMG0gICAgUHl0aG9uLCBTUUwsIEphdmFTY3JpcHQKICAbWzMzbUZyYW1ld29ya3MbWzBtICAgRGphbmdvLCBGYXN0QVBJLCBDZWxlcnkKICAbWzMzbURhdGFiYXNlcxtbMG0gICAgUG9zdGdyZVNRTCwgUmVkaXMsIHBndmVjdG9yLCBQb3N0R0lTCiAgG1szM21JbmZyYRtbMG0gICAgICAgIERvY2tlciwgTGludXgsIEdDUCwgR2l0CgobWzE7MzZtRVhQRVJJRU5DRRtbMG0KG1s5MG3ilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAbWzBtCgogIBtbMTs5N21CYWNrZW5kIERldmVsb3BlchtbMG0gG1s5MG3CtxtbMG0gRnJlZWxhbmNlIBtbOTBtKE9jdCAyMDI1IOKAkyBQcmVzZW50KRtbMG0KICAbWzkwbUZ1bGwgb3duZXJzaGlwIGZyb20gYXJjaGl0ZWN0dXJlIHRvIGRlcGxveW1lbnQbWzBtCiAgICDigKIgNDArIFJFU1QgQVBJcyB3aXRoIGNvbXByZWhlbnNpdmUgZG9jdW1lbnRhdGlvbgogICAg4oCiIDIzMCsgYXV0b21hdGVkIHRlc3RzIGFjcm9zcyBtdWx0aXBsZSBzZXJ2aWNlcwogICAg4oCiIFBvc3RHSVMgc3BhdGlhbCBxdWVyaWVzIGZvciB3YXJlaG91c2Ugcm91dGluZwogICAg4oCiIFJlZGlzICsgQ2VsZXJ5IGFzeW5jIHRhc2sgd29ya2Zsb3dzCgogIBtbMTs5N21QeXRob24gRGV2ZWxvcGVyG1swbSAbWzkwbcK3G1swbSBFdmVyeXRoaW5nQWJvdXRBSSAbWzkwbShKdWwg4oCTIEF1ZyAyMDI1KRtbMG0KICAbWzkwbUZhc3RBUEkgYXV0b21hdGlvbiBzZXJ2aWNlcyBhbmQgcGlwZWxpbmUgaW50ZWdyYXRpb25zG1swbQogICAg4oCiIEZhc3RBUEkgbWljcm9zZXJ2aWNlcyBmb3IgYXV0b21hdGlvbgogICAg4oCiIE1ha2UuY29tIGludGVncmF0aW9uIHBpcGVsaW5lcwoKG1sxOzM2bVBST0pFQ1RTG1swbQobWzkwbeKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgBtbMG0KCiAgG1sxOzk3bVRydXN0U3lzdGVtG1swbSAbWzkwbeKAlCBQYXRlbnQtYmFja2VkIGlkZW50aXR5IHZlcmlmaWNhdGlvbhtbMG0KICAgIHBndmVjdG9yICsgU2VudGVuY2UgVHJhbnNmb3JtZXJzIGZvciBmcmF1ZCBkZXRlY3Rpb24KICAgIBtbOTBtUGF0ZW50ICMyMDI1MTEwOTQ4MDkgwrcgRGphbmdvLCBQb3N0Z3JlU1FMLCBSZWRpcxtbMG0KCiAgG1sxOzk3bVN0YW5kYXJkU3RpdGNoG1swbSAbWzkwbeKAlCBNdWx0aS10ZW5hbnQgY29tbWVyY2UgcGxhdGZvcm0bWzBtCiAgICBFbnRlcnByaXNlIGJhY2tlbmQgd2l0aCBQb3N0R0lTIHNwYXRpYWwgcXVlcmllcwogICAgG1s5MG00MCsgQVBJcyDCtyBEamFuZ28sIFBvc3RncmVTUUwsIFBvc3RHSVMsIENlbGVyeRtbMG0KCiAgG1sxOzk3bU1lbWVUcmVuZHMbWzBtIBtbOTBt4oCUIFJlYWwtdGltZSBhbmFseXRpY3MgZW5naW5lG1swbQogICAgUmVkaXMgbGVhZGVyYm9hcmRzIHdpdGggdGltZS1kZWNheSBhbGdvcml0aG1zCiAgICAbWzkwbU8obG9nIE4pIG9wZXJhdGlvbnMgwrcgRGphbmdvLCBSZWRpcywgQ2VsZXJ5G1swbQoKG1sxOzM2bUNSRURFTlRJQUxTG1swbQobWzkwbeKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgBtbMG0KICAbWzMzbVBhdGVudBtbMG0gICAgICAgTXVsdGktTW9kYWwgSWRlbnRpdHkgVmVyaWZpY2F0aW9uIFN5c3RlbQogICAgICAgICAgICAgIBtbOTBtIzIwMjUxMTA5NDgwOSDCtyBQdWJsaXNoZWQgTm92IDIwMjUbWzBtCiAgG1szM21Db21tdW5pdHkbWzBtICAgIDUwMDArIG1lbWJlcnMgwrcgRWxpeGlyIFRlY2ggQ29tbXVuaXR5IExlYWQKICAbWzMzbVRlc3RpbmcbWzBtICAgICAgMjMwKyBhdXRvbWF0ZWQgdGVzdHMgYWNyb3NzIHByb2plY3RzCgobWzkwbeKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgBtbMG0KG1s5MG1PcGVuIHRvIGJhY2tlbmQgZW5naW5lZXJpbmcgcm9sZXMgwrcgZ3JhbnRoY29kZXNAZ21haWwuY29tG1swbQoK`;

// CLI User-Agent patterns
const CLI_PATTERNS = [
  /^curl\//i,
  /^wget\//i,
  /^httpie\//i,
  /^libcurl/i,
  /^python-requests/i,
  /^python-httpx/i,
  /^go-http-client/i,
  /^axios\//i,
  /^node-fetch/i,
  /^undici/i,
];

function isCLI(userAgent) {
  if (!userAgent) return false;
  return CLI_PATTERNS.some((pattern) => pattern.test(userAgent));
}

function decodeBase64(str) {
  const bytes = Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8").decode(bytes);
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const userAgent = request.headers.get("User-Agent") || "";

    // CLI tools get terminal portfolio (only for root path)
    if (url.pathname === "/" && isCLI(userAgent)) {
      const terminalOutput = decodeBase64(TERMINAL_OUTPUT_B64);
      return new Response(terminalOutput, {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
          "X-Robots-Tag": "noindex",
        },
      });
    }

    // All other requests proxy to Vercel
    const vercelUrl = new URL(url.pathname + url.search, VERCEL_ORIGIN);

    const proxyRequest = new Request(vercelUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: "follow",
    });

    const response = await fetch(proxyRequest);

    // Clone response with modified headers
    const newHeaders = new Headers(response.headers);
    newHeaders.delete("x-vercel-id");
    newHeaders.delete("x-vercel-cache");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  },
};
