    for(var frmFileFullPath of frameworkFilesToEmbed) {
        var justFrameworkFile = path.basename(frmFileFullPath);
        var fileRef = getFileRefFromName(myProj, justFrameworkFile);
        var fileId = getFileIdAndRemoveFromFrameworks(myProj, justFrameworkFile);

        // Adding PBXBuildFile for embedded frameworks
        var file = {
            uuid: fileId,
            basename: justFrameworkFile,
            settings: {
                ATTRIBUTES: ["CodeSignOnCopy", "RemoveHeadersOnCopy"]
            },

            fileRef:fileRef,
            group:groupName
        };
        myProj.addToPbxBuildFileSection(file);


        // Adding to Frameworks as well (separate PBXBuildFile)
        var newFrameworkFileEntry = {
            uuid: myProj.generateUuid(),
            basename: justFrameworkFile,

            fileRef:fileRef,
            group: "Frameworks"
        };
        myProj.addToPbxBuildFileSection(newFrameworkFileEntry);
        myProj.addToPbxFrameworksBuildPhase(newFrameworkFileEntry);
    }

    fs.writeFileSync(projectPath, myProj.writeSync());
    console.log('Embedded Frameworks In ' + context.opts.plugin.id);
};
