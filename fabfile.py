#!/usr/bin/env python

import click
import fabric


def deploy(c):
    with c.cd("/opt/beta.tahm-ken.ch"):
        c.run("git fetch")
        c.run("git status")
        if not click.confirm("Stash and deploy to main ?", default=True):
            exit()
        c.run("git stash")
        c.run("git checkout main")
        c.run("git pull")
        c.run("docker compose up --build")


c = fabric.Connection(host="beta.tahm-ken.ch", user="root", port=22)
deploy(c)