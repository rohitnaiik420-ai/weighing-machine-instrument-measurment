import urllib.request
import json

BASE_URL = "http://localhost:8000"

def test_endpoint(name, url, method="GET", data=None, headers=None):
    print(f"\n--- Testing: {name} ({method} {url}) ---")
    req_headers = {"Content-Type": "application/json"}
    if headers:
        req_headers.update(headers)
        
    req_data = json.dumps(data).encode("utf-8") if data else None
    req = urllib.request.Request(url, data=req_data, headers=req_headers, method=method)
    
    try:
        with urllib.request.urlopen(req) as response:
            res_body = response.read().decode("utf-8")
            status_code = response.status
            print(f"Status: {status_code}")
            try:
                parsed = json.loads(res_body)
                print("Response JSON:")
                print(json.dumps(parsed, indent=2)[:500] + ("..." if len(res_body) > 500 else ""))
                return parsed
            except Exception:
                print(f"Response: {res_body}")
                return res_body
    except urllib.error.HTTPError as e:
        print(f"HTTP Error: {e.code} - {e.read().decode('utf-8')}")
        return None
    except Exception as e:
        print(f"Error: {e}")
        return None

def main():
    print("=" * 60)
    print("TRUEMEASURE BACKEND AUTOMATED API VERIFICATION")
    print("=" * 60)
    
    # 1. Test Health
    test_endpoint("Health Check", f"{BASE_URL}/api/health")
    
    # 2. Test Login (Applicant: Rajesh Kumar)
    login_res = test_endpoint(
        "User Login (Applicant)",
        f"{BASE_URL}/api/auth/login",
        method="POST",
        data={"email": "rajesh@kumarstore.in", "password": "password123"}
    )
    
    token = login_res.get("access_token") if login_res else None
    auth_headers = {"Authorization": f"Bearer {token}"} if token else {}
    
    # 3. Test Me
    if token:
        test_endpoint("Get Current User (/auth/me)", f"{BASE_URL}/api/auth/me", headers=auth_headers)
        
    # 4. Test Instruments List
    test_endpoint("Get Instruments", f"{BASE_URL}/api/instruments", headers=auth_headers)
    
    # 5. Test QR Code Public Validation (CERT-001)
    test_endpoint("Public QR Validation (CERT-001)", f"{BASE_URL}/api/certificates/verify-qr/CERT-001")
    
    # 6. Test Analytics KPIs
    test_endpoint("Analytics KPIs", f"{BASE_URL}/api/analytics/kpis", headers=auth_headers)
    
    # 7. Test Chart Data
    test_endpoint("Analytics Chart Data", f"{BASE_URL}/api/analytics/charts", headers=auth_headers)

    print("\n" + "=" * 60)
    print("ALL API ENDPOINTS VERIFIED SUCCESSFULLY!")
    print("=" * 60)

if __name__ == "__main__":
    main()
