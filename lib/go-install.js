var proc = require('child_process');

module.exports = {
    activate: function() {
        atom.workspaceView.command('go-install:run', this.run);
    },
    run: function() {
        var textEditor = atom.workspace.getActiveTextEditor();
        var grammar = textEditor.getGrammar();
        if( !grammar || grammar.name != 'Go' ){
            return;
        }
        var gopath = process.env.GOPATH;
        var gosrcpath = gopath + '/src/';
        var filepath = textEditor.getPath();

        var pkgpath = filepath.substring(gosrcpath.length);
        pkgpath = pkgpath.substring(0,pkgpath.lastIndexOf("/"))

        var args = ['go','install',pkgpath];
        proc.exec(args.join(' '),{
            cwd : gopath
        }
        ,function (error, stdout, stderr){
            //done
            if( error != null ){
                atom.notifications.addError(stderr);
            }
        });


    }
};
