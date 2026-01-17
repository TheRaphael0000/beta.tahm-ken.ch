#!/usr/bin/env python

import click
import fabric

REPO = "TheRaphael0000/beta.tahm-ken.ch"

def deploy(c):
    with c.cd("/opt/beta.tahm-ken.ch/releases"):
        result = c.run(f"curl -s https://api.github.com/repos/{REPO}/releases/latest | jq -r .tag_name")
        version = result.stdout.strip()
        c.run(f"wget -nc https://github.com/{REPO}/releases/download/{version}/tahm-ken.ch-{version}.zip")
        c.run(f"unzip -n tahm-ken.ch-{version}.zip -d {version}")
        
    with c.cd("/opt/beta.tahm-ken.ch"):
        c.run(f"rm build/* -r")
        c.run(f"cp releases/{version}/* build -r")


c = fabric.Connection(host="beta.tahm-ken.ch", user="root", port=22)
deploy(c)