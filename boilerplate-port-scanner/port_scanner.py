from common_ports import ports_and_services
import socket
import re
import validators
import tld

def get_open_ports(target, port_range, verbose='False'):
    open_ports = []

    # Check the type: IP or domain
    checkTarget = re.match(r"^[0-9\.]*$", target) # Check for IP
    if checkTarget:
        try:
            checkIP = validators.ipv4(target) # Check if IP is valid
            if checkIP:
                for port in range(min(port_range), max(port_range) + 1):
                    try:
                        socket.create_connection((target, port), 5)
                        open_ports.insert(len(open_ports), port)
                        socket.close(3)
                    except:
                        pass
            else:
                open_ports = 'Error: Invalid IP address'
        except:
            pass
    else: # Check for domain
        try:
            tld.get_fld(target, fix_protocol=True) # Check if domain is valid
            for port in range(min(port_range), max(port_range) + 1):
                try:
                    socket.create_connection((target, port), 5)
                    open_ports.insert(len(open_ports), port)
                    socket.close(3)
                except:
                    pass
        except:
            open_ports ='Error: Invalid hostname'

    if verbose == True:
        ip_addr = socket.gethostbyname(target)
        fqdn = socket.getfqdn(ip_addr)

        try:
            hostname = tld.get_fld(fqdn, fix_protocol=True)
            if hostname in target:
                results = "Open ports for " + target + " (" + ip_addr + ")\nPORT     SERVICE"
            else:
                results = "Open ports for " + hostname + " (" + ip_addr + ")\nPORT     SERVICE"
        except:
            results = "Open ports for " + ip_addr + "\nPORT     SERVICE"
                
        for port in open_ports:
            for k in ports_and_services:
                if k == port:
                    results += '\n{:<9}{}'.format(k, ports_and_services[k])

        open_ports = results
            

    return(open_ports)