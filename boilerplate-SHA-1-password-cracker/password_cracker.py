import hashlib

def crack_sha1_hash(hash, use_salts='False'):
    with open('./top-10000-passwords.txt', 'r') as p:
        for password in p:
            if use_salts == True:
                with open('./known-salts.txt', 'r') as s:
                    for salt in s:
                        try:
                            salted = salt.strip() + password.strip()
                            genHash = hashlib.sha1(salted.encode()).hexdigest()
                            if genHash == hash:
                                return password.strip()
                        except:
                            pass
                        try:
                            salted = password.strip() + salt.strip()
                            genHash = hashlib.sha1(salted.encode()).hexdigest()
                            if genHash == hash:
                                return password.strip()
                        except:
                            pass
                        try:
                            salted = salt.strip() + password.strip() + salt.strip()
                            genHash = hashlib.sha1(salted.encode()).hexdigest()
                            if genHash == hash:
                                return password.strip()
                        except:
                            return "PASSWORD NOT IN DATABASE"
            else:
                pw = password.strip()
                genHash = hashlib.sha1(pw.encode()).hexdigest()
                if genHash == hash:
                    return password.strip()
        else:
            return "PASSWORD NOT IN DATABASE"